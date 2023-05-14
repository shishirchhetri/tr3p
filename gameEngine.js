const {
  Client,
  EmbedBuilder,
  MessageEmbed,
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
  console.log(`Spark = ${s} wpm, ZePhYr = ${z} wpm and Cols = ${c} wpm`);

  const zephyrScore = parseInt(z);
  const sparkScore = parseInt(s);
  const colsScore = parseInt(c);

  const zephyrWinningScore = 50;
  const sparkWinningScore = 60;
  const colsWinningScore = 110;
  const zephyrHighScore = 55;
  const sparkHighScore = 65;
  const colsHighScore = 120;
  const zephyrDrawScore = 40;
  const sparkDrawScore = 50;
  const colsDrawScore = 100;

  let result = '';
  let points = 0;
  if (
    zephyrScore < colsDrawScore &&
    sparkScore < sparkDrawScore &&
    colsScore < colsDrawScore
  ) {
    result = 'Match drawn!';
  } else if (
    zephyrScore >= zephyrWinningScore &&
    sparkScore < sparkWinningScore &&
    colsScore < colsWinningScore
  ) {
    result = 'Zephyr wins!';
    points = 1;
  } else if (
    sparkScore >= sparkWinningScore &&
    zephyrScore < zephyrWinningScore &&
    colsScore < colsWinningScore
  ) {
    result = 'Spark wins!';
    points = 1;
  } else if (
    colsScore >= colsWinningScore &&
    zephyrScore < zephyrWinningScore &&
    sparkScore < sparkWinningScore
  ) {
    result = 'Cols wins!';
    points = 1;
  } else if (
    zephyrScore >= zephyrHighScore &&
    sparkScore >= sparkHighScore &&
    colsScore >= colsHighScore
  ) {
    result = 'Match drawn!';
  } else if (
    zephyrScore >= zephyrHighScore &&
    sparkScore < sparkHighScore &&
    colsScore < colsHighScore
  ) {
    result = 'Zephyr wins!';
    points = 1;
  } else if (
    sparkScore >= sparkHighScore &&
    zephyrScore < zephyrHighScore &&
    colsScore < colsHighScore
  ) {
    result = 'Spark wins!';
    points = 1;
  } else if (
    colsScore >= colsHighScore &&
    zephyrScore < zephyrHighScore &&
    sparkScore < sparkHighScore
  ) {
    result = 'Cols wins!';
    points = 1;
  } else if (
    zephyrScore >= zephyrDrawScore &&
    zephyrScore < zephyrWinningScore &&
    sparkScore < sparkWinningScore &&
    colsScore < colsDrawScore
  ) {
    result = 'Zephyr wins!';
    points = 1;
  } else if (
    sparkScore >= sparkDrawScore &&
    sparkScore < sparkWinningScore &&
    zephyrScore < zephyrWinningScore &&
    colsScore < colsDrawScore
  ) {
    result = 'Spark wins!';
    points = 1;
  } else if (
    colsScore >= colsDrawScore &&
    colsScore < colsWinningScore &&
    zephyrScore < zephyrWinningScore &&
    sparkScore < sparkDrawScore
  ) {
    result = 'Cols wins!';
    points = 1;
  } else {
    result = 'The match is a draw, and each player gets 0 points.';
  }

  const embed = new EmbedBuilder()
    .setTitle('MATCH Results')
    .setDescription('Here are the results of the game:')
    .addFields({ name: 'Zephyr Score', value: `${zephyrScore}`, inline: true })
    .addFields({ name: 'Spark Score', value: `${sparkScore}`, inline: true })
    .addFields({ name: 'Cols Score', value: `${colsScore}`, inline: true })
    .addFields({ name: 'Result', value: `${result}`, inline: false })
    .setTimestamp();

  if (points > 0) {
    embed.addFields({name: 'Points', value: `${points}`});
  }

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

  if (command === 'playgame' || command === 'pg' || command === 'gg') {
    const [zephyrScore, sparkScore, colsScore] = args.map(Number);

    if (isNaN(zephyrScore) || isNaN(sparkScore) || isNaN(colsScore)) {
      message.reply('Please provide scores for all players as numbers.');
      return;
    }

    const embed = createPlayGameEmbed(zephyrScore, sparkScore, colsScore);
    message.channel.send({ embeds: [embed] });
  } else if (command === 'help' || command === 'h') {
    // Create an embed card with the available commands
    const embed = new EmbedBuilder()
      .setTitle('Available Commands')
      .setDescription('Here are the available commands:')
      .addFields(
        { name: '!help (!h)', value: 'Displays the available commands.' },
        { name: '!playgame (pg or gg)', value: 'Starts a game.' },
        { name: '!gameplay', value: 'Displays the game instructions.' }
      );
    // Send the embed as a reply to the user's message
    message.reply({ embeds: [embed] });
  } else if (command === 'gameplay' || command === 'gp') {
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
