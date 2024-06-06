import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import { AuthProvider } from './context/authContext'; 

function App(props) {
  return (
    <AuthProvider>
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            {props.children}
          </div>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
export default App;
