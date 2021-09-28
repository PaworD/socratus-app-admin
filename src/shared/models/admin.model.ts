import { Role } from "@/shared/models/atom";

export interface IAdmin {
    getName(): string
}

export interface AdminData {
    name: string
    lastName: string,
    role: Role,
    phone: string
}

export type Admin = Partial<AdminData & IAdmin>