export interface Reading {
    tid: number;
    timeStamp: number;
    objectsId: number;
    objectId: number;
    posX: number;
    posZ: number;
    posY: number;
    accX: number;
    accY: number;
    accZ: number;
    g: number;
    confidence_level: number;
  }

export interface CordsType {
    x: number;
    y: number;
    z: number;
}