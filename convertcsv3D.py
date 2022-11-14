"""Convert mmWave binary recording to CSV."""

import csv
import mmwave3D
import math

def convert_file(input_file, output_file):

    frame_duration = 0.12
	
    with open(output_file, 'w') as csvFile:
        writer = csv.writer(csvFile, delimiter=';', lineterminator='\n')

        hours = int(input_file[(len(input_file)-16):(len(input_file)-14)])
        minutes = int(input_file[(len(input_file)-14):(len(input_file)-12)])
        seconds = int(input_file[(len(input_file)-12):(len(input_file)-10)])
        microseconds = int(input_file[(len(input_file)-10):(len(input_file)-4)])
        date = hours * 3600 + minutes * 60 + seconds + microseconds/1000000
        #print(hours,' ',minutes,' ', seconds,' ', microseconds)
        #print (date)
        
        start = 1
		
        for frame in mmwave3D.read_mmwave_file(input_file):
            
            if start:
                start_frame = frame.number
                print ('Start frame:',start_frame)
                start = 0
            """
            if frame.num_points!=None:
                #print(frame.num_points)
                
                for p in range(frame.num_points):
                    data = []
                    data.append(frame.number)
                    timestamp = (date + (frame.number - start_frame) * frame_duration) / 86400
                    if (timestamp >= 1):
                        timestamp = timestamp - 1
                    data.append(timestamp)
                    data.append(p+1)
                    data.append(math.pi / 180 * frame.points[p][0]) #azimuth
                    data.append(math.pi / 180 * frame.points[p][1]) #elevation
                    data.append(frame.points[p][2])                 #velocity
                    data.append(frame.points[p][3])                 #object range
                    data.append(frame.points[p][4])                 #SNR
                    writer.writerow(data)
            """        
            if frame.num_targets!=None:
                #print(frame.num_points)
                
                for p in range(frame.num_targets):
                    data = []
                    data.append(frame.number)
                    timestamp = (date + (frame.number - start_frame) * frame_duration) / 86400
                    if (timestamp >= 1):
                        timestamp = timestamp - 1
                    data.append(timestamp)
                    data.append(p+1)
                    data.append(frame.targets[p][0])    #tid
                    data.append(frame.targets[p][1])    #posX
                    data.append(frame.targets[p][2])    #posY
                    data.append(frame.targets[p][3])    #posZ
                    data.append(frame.targets[p][4])    #velX
                    data.append(frame.targets[p][5])    #velY
                    data.append(frame.targets[p][6])    #velZ 
                    data.append(frame.targets[p][7])    #accX
                    data.append(frame.targets[p][8])    #accY
                    data.append(frame.targets[p][9])    #accZ                     
                    writer.writerow(data)        
            #"""

        
        #points_s = ';'.join(str(e) for e in points)
        #print (points)
        #points = [{'x': p[0], 'y': p[1], 'v': 3.6 * p[3]} for p in frame.points]
        #sideInfo = [{'snr': k[0], 'noise': k[1]} for k in frame.side_info]
        #statistics = [{'processing': frame.inter_process, 'transmission': frame.transmit_out, 'interframe': frame.frame_margin, 'interchirp': frame.chirp_margin, 'CPU active': frame.active_cpu_load, 'CPU inter': frame.inter_cpu_load}]
        #data.append([frame.number, frame.cycles, frame.num_objects])
        #print (data)
        #data.append(points)
            

        csvFile.close()
if __name__ == "__main__":
    import os

    folder = 'data'
    for f in os.listdir(folder):
        if f.endswith('dat'):
            print(f)
            basename = os.path.splitext(f)[0]
            outname = f'{basename}.csv'
            convert_file(os.path.join(folder, f), os.path.join(folder, outname))
