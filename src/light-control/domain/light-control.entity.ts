// src/light-control/domain/light-control.entity.ts

export class LightStatus {
  constructor(
    public readonly isOn: boolean,
    public readonly brightness: number
) {}
}