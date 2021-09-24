import { Modals } from '@/views/root/contracts'
import { VueConstructor } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export const AppModals : Record<Modals, VueConstructor> = {
    [Modals.CreateStudent] : HelloWorld
}