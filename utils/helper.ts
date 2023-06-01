export async function retryFetch<T>(fn: () => Promise<T>, token: () => Promise<void>, maxRetries: number = 3, delay: number = 1000) {
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            const result = await fn();
            return result;
        } catch (error: any) {
            console.log(`Error occurred: ${error.message}. Retrying in ${delay}ms...`);
            retryCount++;

            if (error.response && error.response.status === 401) {
                await token();
            }

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    console.log(`Failed after ${maxRetries} retries.`);
    return null;
}
