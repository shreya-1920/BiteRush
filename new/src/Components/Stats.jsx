import { Container } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";

function Counter({ end, duration = 2000, suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="br-stats">
      <Container>

        <div className="br-stats-heading">
          <h2>
            Trusted by food lovers
            <br />
            <span>across the city</span>
          </h2>
        </div>

        <div className="br-stats-grid">

          <div className="br-stat">
            <h3 className="br-stat-number">
              <Counter end={50} suffix="K+" />
            </h3>
            <p>Orders Delivered</p>
          </div>

          <div className="br-stat">
            <h3 className="br-stat-number">
              <Counter end={100} suffix="+" />
            </h3>
            <p>Restaurants</p>
          </div>

          <div className="br-stat">
            <h3 className="br-stat-number">
              <Counter end={20} suffix="K+" />
            </h3>
            <p>Happy Customers</p>
          </div>

          <div className="br-stat">
            <h3 className="br-stat-number">
              <Counter end={4.8} decimals={1} />
            </h3>
            <p>Average Rating</p>
          </div>

        </div>

      </Container>
    </section>
  );
}