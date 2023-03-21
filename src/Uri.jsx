export default class Uri{
    static get rooturi(){return "http://localhost:8000";}
    static get getData(){return "/api/contact"}
    static get insertData(){return "/api/contact/store"}
    static get showData(){return "/api/contact/show/"}
    static get updateData(){return "/api/contact/update/"}
    static get deleteData(){return "/api/contact/destroy/"}

    static get getRoles(){return "/api/roles"}
}