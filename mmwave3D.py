'''mmWave IWR1642BOOST
IWR1642 Single-Chip 76-to-81GHz mmWave Sensor Integrating DSP and MCU Evaluation Module
http://www.ti.com/tool/iwr1642boost

Connection: USB
'''

# import serial
import sys
from struct import unpack
from collections import namedtuple
from math import ceil, log2
import logging
import json
from glob import glob
from datetime import datetime
import time


DATA_PORT = 'COM8' if sys.platform == 'win32' else '/dev/ttyACM1'
CFG_PORT = 'COM7' if sys.platform == 'win32' else '/dev/ttyACM0'

log = logging.getLogger(__name__)

Point = namedtuple('Point', ('elevation', 'azimuth', 'velocity', 'obj_range', 'snr'))
Target = namedtuple('Target', ('tid', 'posX', 'posY', 'posZ', 'velX', 'velY', 'velZ', 'accX', 'accY', 'accZ', 'g', 'confidence_level'))

#magic = b'\x01\x02\x03\x04\x05\x06\x07\x08'
#magic = b'\x02\x01\x04\x03\x06\x05\x08\x07'


class Frame:
    """Single data packet from mmWave sensor."""

    def __init__(self, packet):
        '''Create data frame.
        packet: either a header that is 40 bytes long and starts with magic word,
                or the complete data packet.
        doppler_scale: multiplier for Doppler index
        range_scale: multiplier for range index
        '''
        # header: demo/xwr16xx/mmw/include/mmw_output.h
        # MmwDemo_output_message_header_t
        
        magic = 506660481457717506
        
        if len(packet) < 48:
            print(packet)
            #raise ValueError('Header must be 48 bytes long.')
            print('Header must be 48 bytes long.')
        fields = unpack('Q9I2H', packet[:48])
        #print('Header: ',packet[:48])
        if fields[0] != magic:
            print(packet[:48])
            #raise ValueError('Invalid header, no magic word found.')
            print ('Invalid header, no magic word found.')

        self.version = fields[1]
        self.length = fields[2]
        self.platform = fields[3]
        self.number = fields[4]
        self.subframe_num = fields[5]
        self.chirp_margin = fields[6]
        self.frame_margin = fields[7]
        self.track_processing = fields[8]
        self.uart_sent_time = fields[9]
        self.numTLV= fields[10]
        self.checksum = fields[11]
 
        self.num_points = 0
        self.num_targets = 0
        self.points = []
        self.targets = []
        self.target_index = []
        self.presence = 0
        self.error = 0
        
        #Checksum verification
        fields = unpack('24H', packet[:48])
        checksum = sum (fields)
        #print(checksum)
        n = checksum // 65535
        #print(n)
        checksum = checksum - ((n-1)*65535)
        #print(checksum)
        checksum = -(checksum & 0x8000) | (checksum & 0x7fff) #conversion to short
        
        #print('Checksum:', checksum)
        
        if ~checksum != 0:
        #if self.number >= 58670:
            #raise ValueError('Invalid checksum at', self.number)
            print ('Invalid checksum at frame', self.number)
            print ('Version:', self.version)
            print ('Length:', self.length)
            print ('Number of TLV:', self.numTLV)
            print ('Track processing:', self.track_processing)
            print ('UART sent time:', self.uart_sent_time)
            print ('Checksum (from frame):', self.checksum)
            print ('Checksum (calculated):', checksum)
            print ('Fields:', fields)
            print ('Sum od Fields:', sum(fields))
            self.error = 1
            input("Press Enter to continue...")
        #########################################

    def decode(self, data):
        """Decode frame content."""
        
        """
        if self.number >= 1850:
            print ('Dlugosc danych: ',len(data))
            print ('Dlugosc ramki: ',self.length)
            print ('TLV: ',self.numTLV)
        """
        if len(data) < self.length - 48:
            #raise ValueError(f'Invalid data length, expected {self.length - 40}, got {len(data)}')
            print ('Invalid data length, expected {self.length - 48}, got {len(data)}')
        
        pos = 0
        #print ('TLV: ',self.numTLV)
        
        if self.error != 1:
            for i in range(self.numTLV):
                """
                if self.number >= 1850:
                    print (data[pos:pos + 18])
                """
                TLVtype, TLVlength = unpack('2I', data[pos:pos + 8])
                pos += 8
                #print ('i = ',i)
                #print (TLVtype)
                #print (TLVlength)
                
                
                if TLVtype == 6:
                    #POINT_CLOUD_3D
                    point_unit = unpack('5f',data[pos:pos+20])
                    self.num_points = int(len(data[pos+20:pos+TLVlength-8]) / 8)
                    #print ('Ramka:', self.number)
                    #print ('TLVlength:', TLVlength)
                    #print ('Długość: ', len(data[pos+20:pos+TLVlength-8]))
                    #print('Liczba punktów ',num_points)
                    for k in range (self.num_points):
                        point_struct = unpack('2bh2H',data[pos+(k*8)+20:pos+(k*8)+28])
                        elevation = point_unit [0] * point_struct [0]
                        azimuth = point_unit [1] * point_struct [1]
                        velocity = point_unit [2] * point_struct [2]
                        obj_range = point_unit [3] * point_struct [3]
                        snr = point_unit [4] * point_struct [4]
                        self.points.append(Point(elevation, azimuth, velocity, obj_range, snr))
                
                elif TLVtype == 7:
                    #TARGET_LIST_3D

                    self.num_targets = int(len(data[pos:pos+TLVlength-8]) / 112)
                    #print ('Targets: ', self.num_targets)
                    #print ('Długość: ',len(data[pos:pos+TLVlength-8]))
                    #print('Liczba obiektów ',num_targets)
                   
                    for k in range (self.num_targets):
                        #if k == 2:
                        #    time.sleep(10)
                        #print(pos)
                        target_unit = unpack('I9f',data[pos+(k*112):(pos+k*112)+(10*4)])
                        #print(target_unit[0])
                        tid = target_unit[0]
                        posX = target_unit[1]
                        posY = target_unit[2]
                        posZ = target_unit[3]
                        velX = target_unit[4]
                        velY = target_unit[5]
                        velZ = target_unit[6]
                        accX = target_unit[7]
                        accY = target_unit[8]
                        accZ = target_unit[9]

                        g, confidence_level = unpack ('2f', data[pos+k+(26*4):pos+k+(26*4)+8])
                        self.targets.append(Target(tid, posX, posY, posZ, velX, velY, velZ, accX, accY, accZ, g, confidence_level))

                elif TLVtype == 8:
                    #TARGET_INDEX
                    #print ('TLVlength (8): ', TLVlength-8) 
                    for k in range (TLVlength-8):
                        (targetID,) = unpack ('B', data[pos+k:pos+k+1])
                        #print (targetID)
                        self.target_index.append (targetID)
                    
                elif TLVtype == 11:    
                    #print ('TLVlength (11): ', TLVlength-8)
                    (self.presence,) = unpack('I', data[pos:pos+4])
                    #print('Presence: ', self.presence)
                    #self.presence.append (presence)
                    
                    
                pos += TLVlength - 8
        else:
            pos += len(data)
        # return the remaining data
        return data[pos:]

class MmWave:
    '''Reads data from mmWave IWR1642BOOST radar sensor module.'''

    def __init__(self, data_port=DATA_PORT, cfg_port=CFG_PORT, config=None):
        '''Open the device.'''
        self.data_port = serial.Serial(data_port, baudrate=921600, timeout=5)
        self.cfg_port = serial.Serial(cfg_port, baudrate=115200, timeout=5)
        self.config = {}
        self.doppler_resolution = 0
        self.range_resolution = 0
        self.started = False
        #self.send_command('sensorStop\r')
        if config is not None:
            self.send_config(config)

    def close(self):
        '''Close the device.'''
        self.send_command('sensorStop\r')
        self.data_port.close()
        self.cfg_port.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()

    def send_command(self, command):
        '''Send text command to the config port. Returns the reponse.'''
        if not command.endswith('\r') or not command.endswith('\n'):
            command = command + '\r'
        bcommand = command.encode('utf-8')
        self.cfg_port.write(bcommand)
        # first line is the echo
        resp = self.cfg_port.readline()
        log.debug(f'> {resp.decode(encoding="latin-1").strip()}')
        # second line is the response
        resp = self.cfg_port.readline().decode(encoding='latin-1').strip()
        log.debug(f'< {resp}')
        return resp

    def send_config(self, filename):
        '''Read config from filename and send commands to device.'''
        self.config = {}
        with open(filename) as fin:
            for line in fin:
                line = line.strip()
                if line and line[0].isalpha():
                    self.send_command(line)
                    params = line.split()
                    if len(params) > 1:
                        parameter = params[0]
                        if len(params) == 2:
                            value = float(params[1]) if '.' in params[1] else int(params[1])
                        elif len(params) > 2:
                            value = [float(x) if '.' in x else int(x) for x in params[1:]]
                        if parameter in self.config:
                            if isinstance(self.config[parameter], list):
                                self.config[parameter].append(value)
                            else:
                                self.config[parameter] = [self.config[parameter], value]
                        else:
                            self.config[parameter] = value
                    else:
                        if params[0] == 'sensorStop':
                            self.started = False
                        elif params[0] == 'sensorStart':
                            self.started = True


    def read_frame(self, raw=False):
        '''Read a single data frame. Returns a Frame object.
        raw - if False, do not decode frame, return raw data.
        '''
        header = self.data_port.read(48)
        magic = b'\x02\x01\x04\x03\x06\x05\x08\x07'

        if header[:8] != magic:
            # resync
            for i in range(200):
                if magic in header:
                    idx = header.index(magic)
                    header = header[idx:] + self.data_port.read(idx)
                elif b'\x02' in header[40:]:
                    idx = header.index(b'\x02', 40) + 40
                    header = header[idx:] + self.data_port.read(idx)
                else:
                    header = self.data_port.read(48)
                if header[:8] == magic:
                    print('Resync succesful!')
                    break
            else:
                print (header)
                # raise RuntimeError('Resync failed, no magic word found.')
                print ('Resync failed, no magic word found.')
                return 0
       
        frame = Frame(header)
        
        #print (frame.number)
        #print (frame.version_string)
        #print (frame.length)
        
        data = self.data_port.read(frame.length - 48)

        if raw:
            return header + data
        frame.decode(data)
        return frame

    def __call__(self, raw=False):
        return self.read(raw)

    def decode_frame(self, data):
        """Decode a single frame from binary data."""
        frame = Frame(data[:48])
        frame.decode(data[48:])
        return frame

    def decode_header(self, data):
        """Decode a single frame header from binary data."""
        frame = Frame(data[:48])
        return frame


def read_mmwave_file(filename):
    """Generator reading frames from binary file saved from mmwave sensor."""
    
    magic = b'\x02\x01\x04\x03\x06\x05\x08\x07'
    
    with open(filename, 'rb') as fin:
        while True:
            header = fin.read(48)
            
            #print(len(header))
            
            if len(header) < 48:
                return
            
            if header[:8] != magic:
                print('Resync')              
            # resync
                for i in range(200):
                    if magic in header:
                        idx = header.index(magic)
                        header = header[idx:] + fin.read(idx)
                    elif b'\x02' in header[40:]:
                        idx = header.index(b'\x02', 40) + 40
                        header = header[idx:] + fin.read(idx)
                    else:
                        header = fin.read(48)
                    if header[:8] == magic:
                        print('Resync succesful!')
                        break
                else:
                    print (header)
                    #raise RuntimeError('Resync failed, no magic word found.')
                    print ('Resync failed, no magic word found.')          
            
            frame = Frame(header)
            data = fin.read(frame.length - 48)
            frame.decode(data)
            yield frame

def read_mmwave_file_bin(filename):
    """Generator reading frames from binary file saved from mmwave sensor."""
    
    magic = b'\x02\x01\x04\x03\x06\x05\x08\x07'
    
    with open(filename, 'rb') as fin:
        while True:
            header = fin.read(48)
            if len(header) < 48:
                return
                
            if header[:8] != magic:
                
            # resync
                for i in range(200):
                    if magic in header:
                        idx = header.index(magic)
                        header = header[idx:] + fin.read(idx)
                    elif b'\x02' in header[40:]:
                        idx = header.index(b'\x02', 40) + 40
                        header = header[idx:] + fin.read(idx)
                    else:
                        header = fin.read(48)
                    if header[:8] == magic:
                        print('Resync succesful!')
                        break
                else:
                    print (header)
                    raise RuntimeError('Resync failed, no magic word found.')
                    print ('Resync failed, no magic word found.')                  
                
            frame = Frame(header)
            data = fin.read(frame.length - 48)
            frame.decode(data)
            yield frame, (header + data)
            

def find_ports():
    """Find two ttyACM ports."""
    ports = glob('/dev/ttyACM*')
    if len(ports) != 2:
        return None
    return sorted(ports, reverse=True)


if __name__ == '__main__':
    # for frame in read_mmwave_file(r'C:\Users\greg\OneDrive\Share\mmwave\20190711'
    #           r'\xwr16xx_processed_stream_2019_07_11T11_08_02_510.dat'):
    #     print(frame)
    #     # print(frame.points)
    # raise SystemExit

    logging.basicConfig(level='DEBUG', format='%(message)s')

    data_port = DATA_PORT
    cfg_port = CFG_PORT
    if sys.platform == 'win32':
        config = r'pc_6843_3d_ods_overhead_3m_radial.cfg'
    else:
        config = 'pc_6843_3d_ods_overhead_3m_radial.cfg'
        ports = find_ports()
        if ports:
            data_port, cfg_port = ports
            
    with MmWave(data_port=data_port, cfg_port=cfg_port) as dev:
        dev.send_config(config)
        # record(dev, 'mmwave.dat')
        # raise SystemExit
        timestamp = format(datetime.now().strftime('%Y%m%d_%H%M%S'))
        binary_file = '3dpeoplecount_{}.dat'.format(timestamp)
        with open(binary_file, 'wb') as fout:
            print('Recording started', binary_file)
            while True:
                try:
                    frame = dev.read_frame(raw=True)
                    fout.write(frame)

                except KeyboardInterrupt:
                    break
        fout.close()
        raise SystemExit