export interface MenuProps{
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface MenuState {
    selectedMenu: MenuProps | null;
    menuList: MenuProps[];
    isLoading: boolean;
    isError: boolean;
}