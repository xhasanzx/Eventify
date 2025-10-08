import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page row">
      <div className="col-7">
        <div className="landing-page-title col-12">
          <h1 className="login-page-title">
            Welcome to
            <br />
            <span className="suhba-title">SUHBA</span>
          </h1>
        </div>
        <div className="col-12">
          <p className="login-page-text">
            Create, discover, and join fun social plans with friends. From
            coffee dates to birthday parties, make every moment count.
          </p>
          <p className="login-page-text">
            Going out with friends just got easier—and more fun. Skip the
            endless group chats. Create a plan, pick a time and place, and bring
            everyone together in seconds.
          </p>
        </div>
      </div>

      <div className="col-5">
        <LoginForm />
      </div>
    </div>
  );
}
