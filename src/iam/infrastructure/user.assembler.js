import { User } from "../domain/model/user.entity.js";

export class UserAssembler {
    static toEntitiesFromResponse(response) {
        return response.data.map((user) => this.toEntityFromResource(user));
    }

    static toEntityFromResource(resource) {
        return new User({
            id: resource.id,
            clinicId: resource.clinicId ?? '',
            clinicName: resource.clinicName ?? '',
            role: resource.role ?? '',
            name: resource.name ?? resource.fullName ?? '',
            email: resource.email ?? '',
            password: resource.password ?? '',
            plan: resource.plan ?? '',
            token: resource.token ?? ''
        });
    }
}
