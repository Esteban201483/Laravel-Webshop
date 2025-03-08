import  Header  from '../../Layouts/Header';

export default function Cart(){
    return(
        <>
        <Header></Header>
        <div style={{'padding': '20px'}}>
            <section  className="main-component" style={{'margin': '12px 0 0 0'}}>
                <h1>Cart Worked!!!</h1>

                <button className="main-button w-50" onClick={() => {}}>Go to Checkout</button>
            </section>
        </div>
        </>
    )
}