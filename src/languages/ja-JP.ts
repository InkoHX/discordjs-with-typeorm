import { MessageEmbed } from 'discord.js'

import { Client, Command, Language } from '..'

export default class extends Language {
  public constructor (client: Client) {
    super(client, 'ja-JP', {
      argument: {
        blankString: (paramIndex: number): string => `第${paramIndex}引数が空の文字列です。`
      },
      command: {
        help: {
          description: 'このボットに実装されているすべてのコマンドを表示します。',
          noDescription: '説明無し',
          commandInfo: (commandName: string, usage: string, description: string): string => [
            `> **= ${commandName} =**`,
            `> **説明**: ${description}`,
            `> **使用法**: \`${usage}\``
          ].join('\n')
        },
        language: {
          description: '言語設定を変更します。',
          settingCompleted: (langCode: string): string => `言語を\`${langCode}\`に設定しました。`
        },
        prefix: {
          description: 'コマンドの接頭辞を設定します。',
          notOwner: 'このコマンドはサーバーの管理者のみが使用できます。',
          samePrefix: '既にその接頭辞が設定されています。',
          settingCompleted: (prefix: string): string => `接頭辞を\`${prefix}\`に設定しました。`
        }
      },
      error: {
        command: {
          errorEmbed: (command: Command, error: Error): MessageEmbed => {
            return new MessageEmbed()
              .setColor('RED')
              .setTitle(`${command.name}コマンドを実行中にエラーが発生しました。`)
              .addField('エラーネーム', error.name)
              .addField('エラーメッセージ', error.message)
              .setTimestamp()
          },
          missingArguments: (paramIndex): string => `第${paramIndex}引数が不足しています。`
        },
        resolver: {
          boolean: (paramIndex: number): string => `第${paramIndex}引数は"true"または"false"を指定する必要があります。`,
          number: (paramIndex: number): string => `第${paramIndex}引数は整数にする必要があります。`,
          language: (paramIndex: number, codes: string[]): string => [
            `第${paramIndex}引数には下記の文字列のどれかを入力する必要があります。`,
            '',
            '```ts',
            codes.join(', '),
            '```'
          ].join('\n'),
          command: (paramIndex: number, commands: string[]): string => [
            `第${paramIndex}引数には下記の文字列のどれかを入力する必要があります。`,
            '',
            '```ts',
            commands.join(', '),
            '```'
          ].join('\n')
        }
      }
    })
  }
}