import { Entity } from "src/core/entities/entity";
import { Optional } from "src/core/optional";

export type UserProps = {
    name: string;
    cpf?: string;
    cnpj?: string;
    email: string;
    password: string;
    type: string;
};

export class User extends Entity<UserProps> {
    get name() {
        return this.props.name;
    }

    
    get cpf() {
        return this.props.cpf;
    }
    
    get cpnj() {
        return this.props.cnpj;
    }
    
    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    get type() {
        return this.props.type;
    }

    public static create(props: UserProps, id?: string) {
        return new User(props, id);
    }
}