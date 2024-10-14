
import {homeGETController,userDataController, userLoginController,
    userRegisterController
} from '../controllers/index.js';

//Router
const router = {
    '/': {
        GET: {
            '/': homeGETController
        }
    },
    '/user': {
        GET: {
            '/user/data': userDataController,
        },
        POST: {
            '/user/login': userLoginController,
            '/user/register' : userRegisterController
        },
    }
}




export default router;

