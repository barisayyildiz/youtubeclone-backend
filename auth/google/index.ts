require('dotenv').config()
import { google } from "googleapis"
import axios from "axios"

const {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_REDIRECT,
	SERVER_ROOT
} = process.env

export const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${SERVER_ROOT}/${GOOGLE_CLIENT_REDIRECT}`
);

export function getGoogleAuthUrl(){	
	const scopes = [
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile"
	]
	const url = oauth2Client.generateAuthUrl({
		scope: scopes
	})
	return url
}

export function getGoogleUser({
	access_token, 
	id_token
}:any):Promise<any>{
	return axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
}


// export function getGoogleUser(
// 	access_token:string, id_token:string
// ):Promise<any>{
// 	return axios
//     .get(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
//       {
//         headers: {
//           Authorization: `Bearer ${id_token}`,
//         },
//       }
//     )
//     .then((res) => res.data)
//     .catch((error) => {
//       console.error(`Failed to fetch user`);
//       throw new Error(error.message);
//     });
// }
