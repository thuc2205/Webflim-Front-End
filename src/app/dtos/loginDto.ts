import{
    IsString,
    IsNotEmpty,

} from 'class-validator'
export class LoginDTO{
    @IsNotEmpty()
    @IsString()
    username : String ;
    @IsNotEmpty()
    @IsString()
    password: String;


    constructor(data:any){
        this.username = data.username;
        this.password = data.password;

    }
}