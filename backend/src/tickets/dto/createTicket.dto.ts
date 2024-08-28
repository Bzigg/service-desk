export class CreateTicketDto {
  // readonly customerId: string
  readonly title: string
  readonly description: string
  readonly building: string
  readonly cabinet: string
  readonly phone: boolean
  readonly status: boolean
}