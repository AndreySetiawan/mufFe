export enum STATUS {
    DRAFT = 10,
    OPEN = 11,
    APPROVE = 12,
    CANCEL = 13,
    COMPLETE = 17,
    ACTIVE = 31,
    DISCONTINUE = 33
}

export enum STOMP_EP {
    user = '/queu/send-to-user',
    stomp = 'jms-to-stomp'
}

export enum STOMP_PARAM {
    user = 'toUser',
    destination = 'destination'
}
