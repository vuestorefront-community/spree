export type Menu = {
    id: number
    name: string
    link?: string
    items?: Menu[]
    isDisabled?: boolean
};

export type GetMenuParams = {
    menuType: string
    menuName: string
};
