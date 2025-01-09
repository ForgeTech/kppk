function catch_error(target: any, propertyName: any, descriptor: any) {
    const method = descriptor.value;

    descriptor.value = function(...args: any) {
        try {
            return method.apply(target, args);
        } catch(error: any ) {
            console.log('>>>>>>>>>ERROR>>>>>>>>')
            console.log(error)
            // throw new Error(`Special error message: ${error.message}`);
        }
    };
}

export {
    catch_error
}