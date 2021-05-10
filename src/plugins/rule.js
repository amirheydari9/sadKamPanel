export function required(text) {

    return value => !!value || text;
}

export function verifyEmail() {

    return value => /^([a-zA-Z0-9]([\.\w]*)@([\w]{2,9}[\.])[a-zA-Z]{2,4})$/.test(value) || 'یک ایمیل معتبر وارد نمایید';
}

export function verifyUserName() {

    return value => /^[a-z0-9_-]{3,15}$/.test(value) || 'یک نام کاربری معتبر وارد نمایید';

}
export function lessThan(length, field, nullable = false) {

    return value => {

        if (!value) {

            if (nullable) {
                return true;
            }
            return field + ' الزامیست'
        }
        return (value ? value.length <= length : false) || `طول ${field} نباید بشتر از ${length} کاراکتر باشد `
    }
}

export function moreThan(length, field, nullable = false) {

    return value => {

        if (!value) {

            if (nullable) {
                return true;
            }

            return field + ' الزامیست'
        }

        return (value ? value.length >= length : false) || `طول ${field} باید بیشتر از ${length} کاراکتر باشد `
    }
}

