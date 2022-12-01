import * as http from 'http';

export default function produto(req) {
    let fname = 'produto';

    this.get = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)
    }

    this.post = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)
    }

    this.put = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)
    }

    this.delete = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)
    }
}