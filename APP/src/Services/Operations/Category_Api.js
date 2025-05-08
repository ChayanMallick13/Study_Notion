import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";
import { setToken,setsignupData } from "../../reducer/Slices/authslice";
import { setUser } from "../../reducer/Slices/ProfileSlice";
import { resetLoader, setLoader } from "../../reducer/Slices/LoaderSlice";


export const fetchCategoryPageDetails = (setCategoryDetails,setLoading,body) => {
    return async(dispatch) => {
        const tid = toast.loading('Loading...');
        setLoading(true);
        apiConnector('POST',categories.CATEGORY_PAGE_DETAILS,body).then(
            (data) => {
                setCategoryDetails(data.data);
            }
        ).catch(
            (err) => {
                console.log(err);
                toast.error('Some Error Occured while retrieving Data');
            }
        );
        toast.dismiss(tid);
        setLoading(false);
    }
}