import {DropdownItemProps} from "@/shared/components/Dropdown/DropdownItem";

export enum DropdownType {
    SIMPLE = 'simple',
    NESTED = 'nested'
}

export interface DropdownProps {
    list: DropdownItemProps[];
    type: DropdownType
    value: string;
}