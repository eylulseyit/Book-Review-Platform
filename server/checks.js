export function emailCheck(input)
{
	const EMAIL_REGEX =
	    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
	return EMAIL_REGEX.test(input);
}

export function passwordCheck(input)
{
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return PASSWORD_REGEX.test(input);
}

export function nameCheck(input)
{
    const NAME_REGEX = /^[a-zA-Z]+$/;
    return NAME_REGEX.test(input);
}

export function phoneCheck(input)
{
    const PHONE_REGEX = /^\d{10}$/;
    return PHONE_REGEX.test(input);
}

export function idCheck(input)
{
    const ID_REGEX = /^\d+$/;
    return ID_REGEX.test(input);
}