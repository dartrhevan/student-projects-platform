import Tag from "../model/Tag";

export default interface ListItemProps {
    key: string
}

export interface IBadge {
    id: string
    title: string
    description?: string
    tags?: Tag[]
    label?: string
}
