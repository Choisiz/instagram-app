const apolloClientOptions = {
    uri: "http://172.30.1.54:4000/",
    // Android 에뮬레이터를 사용하는 경우 localhost를 사용하여 graphql에 접근할 수 없다
    //ip주소 
    onError: (e) => { console.log(e) },
};

export default apolloClientOptions;