export interface IFeatures {
    type: string;
    geometry: {
        type: string;
        coordinates: Array<Array<number>>;
    };
    properties: {
        SIG_CD: string
        SIG_ENG_NM: string
        SIG_KOR_NM: string
    };
}

export interface IGeo {
    type: string;
    features: IFeatures[];
}

interface IThumbnails {
    url: string;
}

export interface IMarkerResp {
    address: string;
    businessHoursEnd: string;
    businessHoursStart: string;
    cafeId: string;
    description: string | null;
    homePage: string;
    latitude: string;
    longitude: string;
    roadAddress: string;
    save: boolean;
    tel: string;
    thumbnails: IThumbnails[];
    title: string;
    reviewCount?: number;
}