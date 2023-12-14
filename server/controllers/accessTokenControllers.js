import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

let clientKey = process.env.WEBFLOW_CLIENT_KEY;
let secretKey = process.env.WEBFLOW_SECRET_KEY;
let redirectURI = process.env.WEBFLOW_REDIRECT_URI;

let useraccess = 'zealwebflowapp';
let authstate = "IUDUQbGcUcg6";
let statekey = `${useraccess}:${authstate}`;
let secretstate = btoa(statekey);

const accessToken = async (req, res) => {
    let webflowapp = req.query.ref || '';
    let webflowappcan = req.query.error_description ? 'access_denied' : '';

    if (webflowappcan === 'access_denied') {
        res.redirect("https://flowform.in/");
    }

    if (webflowapp === 'zealwebflowapp') {
        res.redirect(`https://webflow.com/oauth/authorize?client_id=${clientKey}&response_type=code&state=${secretstate}`);
    }

    let WebFlowCode = req.query.code || '';
    let WebFlowstate = req.query.state || '';
    let formID = req.query.fid || '';

    if (WebFlowCode && WebFlowstate) {
        Webflow_accessToken(WebFlowCode, WebFlowstate, statekey)
            .then((WaccessJson) => {
                let accessToken = JSON.parse(WaccessJson).access_token;
                return Webflow_get_user(accessToken);
            })
            .then((siteOwner) => {
                // Handle the siteOwner data as needed
                res.send(siteOwner);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    }

    function Webflow_accessToken(wcode, wscode, wskey) {
        return new Promise((resolve, reject) => {
            wscode = Buffer.from(wscode, 'base64').toString('utf-8');

            if (wscode === wskey) {
                axios.post("https://api.webflow.com/oauth/access_token", {
                    redirect_URI: redirectURI,
                    client_id: clientKey,
                    client_secret: secretKey,
                    code: wcode,
                    grant_type: "authorization_code"
                })
                    .then(response => resolve(response.data))
                    .catch(error => reject(error));
            } else {
                resolve("State Code does not match!");
            }
        });
    }

    function Webflow_get_user(webflowAccess) {
        return axios.get('https://api.webflow.com/user', {
            headers: {
                'Authorization': `Bearer ${webflowAccess}`,
                'Accept-Version': '1.0.0'
            }
        })
            .then(response => {
                let userDatafM = {
                    email: response.data.user.email,
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    accessToken: webflowAccess
                };

                // Assuming these functions return promises as well
                let responseMagento = userDatafM;
                console.log(responseMagento)

                return Promise.all([responseMagento]);
            })
            .then(([responseMagento]) => {
                if (responseMagento.data.success === 1) {
                    return { redirectUrl: responseMagento.data.redirectUrl };
                }
            });
    }

}



export { accessToken }