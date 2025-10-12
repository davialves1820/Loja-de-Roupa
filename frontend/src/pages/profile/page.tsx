import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth";
import OrderServices from "../../services/order";
import Loading from "../loading/pages";
import styles from "../profile/page.module.css"
import { LuLogOut, LuTimer, LuCircleCheck, LuCircleAlert } from "react-icons/lu"
import { Link } from "react-router-dom"


export default function Profile() {
    const { logout } = AuthServices();
    const { get_user_orders, order_loading, refetch_orders, orders_list } = OrderServices();
    const navigate = useNavigate();
    // Ensure the data is correctly parsed and defaults to an empty object
    const auth_data = JSON.parse(localStorage.getItem("auth") || "{}");
    const user = auth_data.user; // Get the user object

    useEffect(() => {
        // The check in useEffect is mostly fine, but let's ensure 'user' exists for rendering
        if (!user) {
            navigate("/auth");
        } else {
            get_user_orders(user._id);
        }
        
    }, []);
    
    if (order_loading) {
        return (<Loading/>)
    }

    // Check if user exists before trying to access its properties
    if (!user) {
        // Or you can return null/loading state if navigation hasn't kicked in yet
        return null; 
    }

    const handle_logout = () => {
        logout();
        navigate("/");
    }
    
    return (
        <div>
        <h1>Welcome, {user.fullname}</h1> 
        <h3>{user.email}</h3>
        <button onClick={handle_logout}>Logout</button>

        {orders_list.length > 0 ? 
                <div className={styles.ordersContainer}>
                    {orders_list.map((order) => (
                        <div key={order._id} className={styles.orderContainer}>
                            {order.pickupStatus === 'Pending' ? <p className={`${styles.pickupStatus} ${styles.pending}`}><LuTimer />{order.pickupStatus}</p> : null}
                            {order.pickupStatus === 'Completed' ? <p className={`${styles.pickupStatus} ${styles.completed}`}><LuCircleCheck />{order.pickupStatus}</p> : null}
                            {order.pickupStatus === 'Canceled' ? <p className={`${styles.pickupStatus} ${styles.canceled}`}><LuCircleAlert />{order.pickupStatus}</p> : null}
                            <h3>{order.pickupTime}</h3>
                            {order.orderItems.map((item)=> (
                                <div key={item._id}>
                                    <h4>{item.clothesDetails?.[0]?.name || "Unnamed item"}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            : 
                <div>
                    You do not have orders yet.
                    <Link to={'/plates'} className={styles.platesLink}>Click here and see our specialities!</Link>
                </div>
            }
        </div>
        
    )
}