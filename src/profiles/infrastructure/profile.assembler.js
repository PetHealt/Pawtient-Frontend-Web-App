import { Profile } from "../domain/model/profile.entity.js";

export class ProfileAssembler {
    static toEntityFromResource(resource) {
        return new Profile({
            id: resource.id,
            firstName: resource.firstName,
            lastName: resource.lastName,
            email: resource.email,
            street: resource.street,
            number: resource.number,
            city: resource.city
        });
    }
}