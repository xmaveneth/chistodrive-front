export type Box = {
    id: number;
    name: string;
};

export type BoxesResponse = {
    data: Box[];
};

export type ScriptBox = {
    script_box_id: number;
    box_id: number;
    name: string;
};

export type ScriptBoxesResponse = {
    data: ScriptBox[];
};

export type BoxListType = {
    boxName: string;
    assignmentId: number;
}[];
