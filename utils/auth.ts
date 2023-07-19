import axios from "axios";
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {AppContext} from "@/context/app.context";
export default function AuthUser() {
    const router = useRouter();
    const { setUserData } = useContext(AppContext);
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 'user', {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });
                    setUserData(response.data);
                    console.info(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        } else {
            router.push('/');
        }
    }, []);

    return null;
}