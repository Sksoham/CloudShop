import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Orders.css";

function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/${user.id}`
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="orders-page">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
          >
            <h3>Order ID</h3>

            <p>{order._id}</p>

            <h4>Books</h4>

            {order.books.map((book) => (
              <div
                key={book.id}
                className="book-row"
              >
                <span>
                  {book.title}
                </span>

                <span>
                  ₹{book.price}
                </span>
              </div>
            ))}

            <hr />

            <h3>
              Total : ₹{order.totalAmount}
            </h3>

            <p>
              Status :
              <strong>
                {" "}
                {order.status}
              </strong>
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;