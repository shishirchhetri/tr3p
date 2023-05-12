const {
  Client,
  EmbedBuilder,
  Embed,
  GatewayIntentBits,
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

function createPlayGameEmbed(s, z, c) {
  const zephyrScore = parseInt(z);
  const sparkScore = parseInt(s);
  const colsScore = parseInt(c);
  let result = '';
  let points = 0;
  if (zephyrScore < 40 && sparkScore < 50 && colsScore < 100) {
    result = 'Match drawn!';
  } else if (zephyrScore >= 50 && sparkScore < 60 && colsScore < 110) {
    result = 'Zephyr wins!';
    points = 1;
  } else if (sparkScore >= 60 && zephyrScore < 50 && colsScore < 110) {
    result = 'Spark wins!';
    points = 1;
  } else if (colsScore >= 110 && zephyrScore < 50 && sparkScore < 60) {
    result = 'Cols wins!';
    points = 1;
  } else if (zephyrScore >= 55 && sparkScore >= 65 && colsScore >= 120) {
    result = 'Match drawn!';
  } else if (zephyrScore >= 55 && sparkScore < 65 && colsScore < 120) {
    result = 'Zephyr wins!';
    points = 1;
  } else if (sparkScore >= 65 && zephyrScore < 55 && colsScore < 120) {
    result = 'Spark wins!';
    points = 1;
  } else if (colsScore >= 120 && zephyrScore < 55 && sparkScore < 65) {
    result = 'Cols wins!';
    points = 1;
  } else if (
    zephyrScore >= 40 &&
    zephyrScore < 50 &&
    sparkScore < 50 &&
    colsScore < 100
  ) {
    result = 'Zephyr wins!';
    points = 1;
  } else if (
    sparkScore >= 50 &&
    sparkScore < 60 &&
    zephyrScore < 50 &&
    colsScore < 100
  ) {
    result = 'Spark wins!';
    points = 1;
  } else if (
    colsScore >= 100 &&
    colsScore < 110 &&
    zephyrScore < 50 &&
    sparkScore < 50
  ) {
    result = 'Cols wins!';
    points = 1;
  } else {
    result = 'The match is a draw, and each player gets 0 points.';
  }

  const embed = new EmbedBuilder()
    .setTitle('Play Game Results')
    .setDescription('Here are the results of the game:')
    .addFields(
      { name: 'Zephyr Score', value: zephyrScore, inline: true },
      { name: 'Spark Score', value: sparkScore, inline: true },
      { name: 'Cols Score', value: colsScore, inline: true },
      { name: 'Result', value: result, inline: false }
    );

  return embed;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(`Received command: ${command}`);

  if (command === 'playgame') {
    const zephyrScore = args[0];
    const sparkScore = args[1];
    const colsScore = args[2];

    if (!zephyrScore || !sparkScore || !colsScore) {
      message.reply('Please provide scores for all players.');
      return;
    }

    if (isNaN(zephyrScore) || isNaN(sparkScore) || isNaN(colsScore)) {
      message.reply('Scores must be numbers.');
      return;
    }

    const embed = createPlayGameEmbed(zephyrScore, sparkScore, colsScore);

    message.channel.send({ embeds: [embed] });
  } else if (command === 'help') {
    // Handle the "help" command
    // Send a message with the available commands
    message.reply('Available commands: !playgame, !gameplay, !help');
  } else if (command === 'gameplay') {
    // Handle the "gameplay" command
    const embed = new EmbedBuilder()
      .setTitle('Gameplay')
      .setDescription('Here are the rules of the game:')
      .addFields({
        name: 'How to Win',
        value:
          'To win the game, you must score more points than your opponents.',
      })
      .addFields({
        name: 'Scoring',
        value:
          'Each player scores points based on their performance. The scores are as follows:\n\n- Zephyr: 0-49 points\n- Spark: 50-59 points\n- Cols: 100-119 points\n\nIf a player scores higher than the upper limit of their range, their score is capped at that limit. For example, if Zephyr scores 50 points, their score will be capped at 49 points.',
      })
      .addFields({
        name: 'Draws',
        value: 'If the scores are tied, the game is a draw.',
      })
      .addFields({
        name: 'Points System',
        value:
          'Each game results in 1 point for the winner, 0 points for the loser, and 0.5 points for a draw.',
      })
      .addFields({
        name: 'Examples',
        value:
          'Here are some examples of possible score combinations and their results:\n\n- Zephyr: 45 points, Spark: 55 points, Cols: 110 points. Result: Spark wins!\n- Zephyr: 50 points, Spark: 60 points, Cols: 120 points. Result: Match drawn!\n- Zephyr: 40 points, Spark: 50 points, Cols: 100 points. Result: Zephyr wins!',
      })
      .setColor('#0099ff');
    message.channel.send({ embeds: [embed] });
  } else {
    message.reply('Invalid command.');
  }

  const scores = message.content.trim().split(/\s+/g).slice(1);
  console.log(scores);
});

const mySecret = process.env['CLIENTTOKEN'];
client.login(mySecret);
