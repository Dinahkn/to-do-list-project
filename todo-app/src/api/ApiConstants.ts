export const ApiConstants = {
    TODO : {
        ADD : (userId : number) => {
            return "/task/" + userId;
        },
        FIND_ALL_TASKS: (userId : number) => {
            return "/task/getAll/" + userId;
        },
        MARK_COMPLETE: (taskId : number) => {
            return "/task/updateTask/" + taskId;
        },
        DELETE : (taskId : number) => {
            return "/task/deleteTask/" + taskId;
        }
    },
    USER : {
        SIGN_UP : "/user-info/signUp",
        FIND_ALL :"/user-info",
    },
    LOGIN : "/auth/login",
}