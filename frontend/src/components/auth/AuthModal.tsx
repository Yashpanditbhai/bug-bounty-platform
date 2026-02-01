// import { useDispatch, useSelector } from "react-redux";
// import { closeAuthModal } from "@/store/ui/ui-slice";
// import type { RootState } from "@/store";
// import LoginPage from "@/pages/auth/LoginPage";
// import RegisterPage from "@/pages/auth/RegisterPage";
// import { IoMdClose } from "react-icons/io";

// const AuthModal = () => {
//   const dispatch = useDispatch();
//   const { showAuthModal, authMode } = useSelector((state: RootState) => state.ui);

//   if (!showAuthModal) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//       <div className="bg-white rounded-md w-150 relative">
//         <button
//           onClick={() => dispatch(closeAuthModal())}
//           className="absolute top-3 right-3 text-gray-400 hover:text-black"
//         >
//           <IoMdClose />
//         </button>

//         <div className="p-6">{authMode === "login" ? <LoginPage /> : <RegisterPage />}</div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;
