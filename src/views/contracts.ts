import { Identifier, Image } from "@/shared/models";

export interface Organization extends Identifier {
    name: string
    address: string
    logo: Image
}