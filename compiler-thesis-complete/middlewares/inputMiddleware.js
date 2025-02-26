const noExe = [
    "rm -rf", "rm", "touch", "pwd", "sudo", "rmdir", "man", "mkdir", "cd", "cd ..", 
    "ls", "ls -a", "ls -lhai", "mkdir -p", "cp", "cp -r", "mv", "tree", "wc", "ls /", 
    "wc -l", "ln -s", "tar -czvf", "nano", "vim", "export", "locate", "ls -lSh", "cat", 
    "sudo su", "chmod", "which", "ps aux", "ps", "kill", "top", "htop", "ifconfig", 
    "systemctl", "dnf", "apt", "mount", "ip -a", "ip addr show", "ping", "resolvectl status", 
    "host", "dig", "traceroute", "tracepath", "ssh", "gcp", "yum", "iptables", "crontab -l", 
    "crontab -e", "git clone", "git", "cd /", "grep", "node", "npm", "history", "gcc", "g++", 
    "pm2", "docker", "groups", "users", "uid", "id", "user", "whoami", "lsof", "pkg", "scp", 
    "scp -r", "bash", "#!/bin/bash", "gcloud", "ls -la", "ls -al"
];

// Escape special characters inside command names for regex
const escapedNoExe = noExe.map(cmd => cmd.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));

// Create a regex pattern from the list
const regexPattern = new RegExp(`\\b(${escapedNoExe.join('|')})\\b`, 'i');

const sanitizeInputMiddleware = (req, res, next) => {
    console.log("sanitize input");
    
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "No code provided." });
    }

    const lowerCaseCode = code.toLowerCase();

    if (regexPattern.test(lowerCaseCode)) {
        return res.status(200).json({
            "pid": null,
            "msg": "",
            "stdout": "",
            "stderr": `Execution blocked: Prohibited command detected.`,
            time: null, memory: null,
            ip: req.ip,
            code: 0, signal: null
        });
    }

    next();
};

export default sanitizeInputMiddleware;
