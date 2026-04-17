import { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../State/Store";
import { paymentSuccess } from "../../State/customer/OrderSlice";
import Button from "@mui/material/Button";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId } = useParams<{ orderId: string }>();

  const { paymentId } = useParams(); // 20
  const [searchParams] = useSearchParams();

  const paymentLinkId = searchParams.get("session_id");
  const jwt =
    useAppSelector((state: RootState) => state.auth.jwt) ||
    localStorage.getItem("jwt");

  useEffect(() => {
    console.log("🟡 PaymentSuccess mounted");

    console.log("orderId:", orderId);
    console.log("jwt:", jwt);
    console.log("paymentLinkId:", paymentLinkId);

    if (!orderId || !jwt || !paymentLinkId) {
      console.warn("⛔ Missing required params");
      return;
    }

    dispatch(
      paymentSuccess({
        paymentId: orderId,
        jwt,
        paymentLinkId,
      }),
    );
  }, []);

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className=" bg-[#00927c] text-white p-8 w-[90%] lg:w-[25%] border rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-semibold">Congratulations</h1>
        <h1 className="text-2xl font-semibold">your order get success</h1>
        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate("/")}
          >
            Shopping More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
