type ErrorAlertProps = {
    message: string;
}

export function ErrorAlert ({message}:ErrorAlertProps) {
    return <div role="allert">{message}</div>;
}