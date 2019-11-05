const Card = ({title, children} : {title: string, children: JSX.Element | JSX.Element[]}) => (
    <>
        <div className="card">
            <div className="card-title">{title}</div>
            <div className="card-body">{children}</div>
        </div>
        <style jsx>{`
            .card {
                background-color: white;
                padding: 10px;
            }
            
            .card-title {
                padding-bottom: 3px;
                border-bottom: 1px solid lightgray;
                font-weight: bold;
            }
        `}</style>
    </>
);

export default Card
