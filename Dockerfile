FROM ubuntu

RUN apt-get update && \
	apt-get install -y gnupg apt-transport-https wget software-properties-common && \
	wget -q https://xpra.org/gpg.asc -O- | apt-key add - && \
	add-apt-repository "deb https://xpra.org/ bionic main" && \
	apt-get update && \
	apt-get install -y xpra && \
	apt-get install -y xterm

CMD xpra start-desktop --start=xfce4-session --bind-tcp=0.0.0.0:10000 --html=on  && tail -f /dev/null 

