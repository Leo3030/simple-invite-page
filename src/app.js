import "./app.css";
import Header from "~containers/header";
import Footer from "~containers/footer";
import InvitationContent from "~containers/invitation-content";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <InvitationContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
