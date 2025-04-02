type Props = {
    thisStep?: boolean,
    title: string,
    description: string
}

export const CheckCard = ({thisStep, title, description}: Props) => {
    return(
        <div className="py-2 px-5 text-center" style={{
            color: thisStep ? '#fff' : '#002B8F',
            backgroundColor: thisStep ? '#DD7E10' : '#FEF3E7'
        }}>
            <h5>{title}</h5>
            <h6>{description}</h6>
        </div>
    )
}