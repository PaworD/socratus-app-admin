import { container } from "inversify-props";
import { StudentService } from "@/services";
import { Student } from "@/shared/models";
import { RootService } from "@/services/root.service";
import { LocalStorageService } from "@/services/storage.service";

/**
 * Main registry of DICs
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export default function _buildDependencyContainer(): void {
    container.addTransient<Student>(StudentService)
    container.addTransient<any>(RootService)
    container.addTransient<string>(LocalStorageService)
}