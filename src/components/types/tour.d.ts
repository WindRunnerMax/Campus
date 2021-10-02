export interface SubItem {
    id?: number;
    width?: number;
    height?: number;
    iconPath?: string;
    name: string;
    latitude: string;
    longitude: string;
    icon: "life" | "dormitory" | "scenery" | "canteen" | "door" | "building" | "supermarket";
    img: Array<string>;
    description: string;
}

export interface TabItem {
    name: string;
    data: Array<SubItem>;
}

export interface MarkerImages {
    life: string;
    dormitory: string;
    scenery: string;
    canteen: string;
    door: string;
    building: string;
    supermarket: string;
}

export interface RouteMarkerImages {
    start: string;
    end: string;
}

export interface InitLocation {
    latitude: number;
    longitude: number;
}

export type TourConfig = Array<TabItem>;
