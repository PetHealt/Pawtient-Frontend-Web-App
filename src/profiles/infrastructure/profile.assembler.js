import { Profile } from "../domain/model/profile.entity.js";

export class ProfileAssembler {
    static toEntityFromResource(resource) {
        const [firstName = '', ...lastNameParts] = (resource.fullName ?? '').split(' ');
        return new Profile({
            id: resource.id ?? 0,
            firstName,
            lastName: lastNameParts.join(' '),
            email: resource.email,
            clinicName: resource.clinicName,
            role: resource.role,
            plan: resource.plan
        });
    }
}
