export interface InputMailProps{
    data: string; 
    setData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; 
    labelText: string; 
    disabled?: boolean; 
    width?: string;
    placeHolder?: string; 
    height?: string;
}

export interface InputTextProps{
    data: string; 
    setData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; 
    labelText: string; 
    disabled?: boolean; 
    width?: string;
    placeHolder?: string; 
    height?: string;
}

export interface InputSelectProps{
    data: string; 
    setData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; 
    labelText: string; 
    disabled?: boolean; 
    width?: string;
    placeHolder?: string; 
    height?: string;
    initialOptions: any[];
}

export interface InputNumberProps{
    data: string | number | null;
    setData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; 
    labelText: string; 
    disabled?: boolean; 
    width?: string;
    placeHolder?: string; 
    height?: string;
}

export interface InputPasswordProps{
    data: string; 
    setData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string; 
    labelText: string; 
    disabled?: boolean; 
    width?: string;
    placeHolder?: string; 
    height?: string;
    type: string;
    handleClick: () => void;
}