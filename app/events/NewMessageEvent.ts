import { Broadcastable } from "../../core/http";

interface Payload{
  message: string
}

export default class NewMessageEvent extends Broadcastable<Payload> {
  constructor(
    public message?: string
) {
    super();
  }
  get channel(): string {
    return "new-msg-event.channel:";
  }

  payload(): Payload {
    return {
      message: this.message,
    };
  }

  async defaultPayload(): Promise<Payload> {
    return {
      message: "Default message",
    };
  }
}
