export interface SubItem {
    name: string;
    latitude: string;
    longitude: string;
    icon: "life" | "dormitory" | "scenery" | "canteen" | "door" | "building" | "supermarket";
    img: Array<string>;
    description: string;
}

export interface TabItem {
    name: string;
    scale: number;
    data: Array<SubItem>;
}

export type TourConfig = Array<TabItem>;
